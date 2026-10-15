// Bind this script to the leads spreadsheet and deploy it as a web app.
// Deploy while signed in as shahjangfx@gmail.com so notifications come from that account.
const APPOINTMENT_RECIPIENTS =
    "skshahjahan1994@gmail.com,vinayausekar@gmail.com";

function doPost(event) {
    let request = {};
    let result;

    try {
        request = JSON.parse(event.postData.contents);

        if (!/^[a-zA-Z0-9_-]{8,80}$/.test(request.requestId || "")) {
            throw new Error("Invalid request identifier.");
        }

        if (request.faxNumber) {
            result = {
                success: true,
                message: "Thank you. Your appointment request has been received."
            };
            cacheResult(request.requestId, result);
            return jsonResponse({ accepted: true });
        }

        const lead = validateLead(request);
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        if (!spreadsheet) {
            throw new Error("This script must be bound to the leads spreadsheet.");
        }

        const receivedAt = new Date();
        const lock = LockService.getScriptLock();
        lock.waitLock(10000);

        try {
            const sheet =
                spreadsheet.getSheetByName("Leads") ||
                spreadsheet.insertSheet("Leads");

            if (sheet.getLastRow() === 0) {
                sheet.appendRow([
                    "Received",
                    "Name",
                    "Phone",
                    "Email",
                    "Service",
                    "Message"
                ]);
            }

            const phoneKey = Utilities.computeDigest(
                Utilities.DigestAlgorithm.SHA_256,
                lead.phone
            ).map(function (byte) {
                return ("0" + (byte & 255).toString(16)).slice(-2);
            }).join("");
            const phoneCacheKey = "recent_phone_" + phoneKey;
            const cache = CacheService.getScriptCache();

            if (cache.get(phoneCacheKey)) {
                throw new Error(
                    "A request for this phone number was just received."
                );
            }

            cache.put(phoneCacheKey, "1", 30);
            sheet.appendRow([
                receivedAt,
                asPlainText(lead.name),
                asPlainText(lead.phone),
                asPlainText(lead.email),
                asPlainText(lead.service),
                asPlainText(lead.message)
            ]);
        } finally {
            lock.releaseLock();
        }

        try {
            sendLeadNotification(lead, receivedAt);
            result = {
                success: true,
                message:
                    "Thank you. Your appointment request has been received."
            };
        } catch (emailError) {
            console.error("Lead saved, but notification email failed:", emailError);
            result = {
                success: false,
                message:
                    "Your request was saved, but the email notification could not be sent. Please call +91 99664 09838 to confirm."
            };
        }
    } catch (error) {
        console.error("Appointment lead submission failed:", error);
        result = {
            success: false,
            message:
                "We could not save your request. Please call +91 99664 09838 to book."
        };
    }

    if (request.requestId && /^[a-zA-Z0-9_-]{8,80}$/.test(request.requestId)) {
        cacheResult(request.requestId, result);
    }

    return jsonResponse({ accepted: true });
}

function doGet(event) {
    const requestId = String(event.parameter.requestId || "");
    const callback = String(event.parameter.callback || "");

    if (
        !/^[a-zA-Z0-9_-]{8,80}$/.test(requestId) ||
        !/^[a-zA-Z_$][a-zA-Z0-9_$]{0,100}$/.test(callback)
    ) {
        return ContentService.createTextOutput("/* Invalid status request. */")
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    const cached = CacheService.getScriptCache().get(
        "appointment_status_" + requestId
    );
    const result = cached ? JSON.parse(cached) : { pending: true };

    return ContentService.createTextOutput(
        callback + "(" + JSON.stringify(result) + ");"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function validateLead(request) {
    const lead = {
        name: cleanText(request.name, 120),
        phone: cleanText(request.phone, 24),
        email: cleanText(request.email, 254),
        service: cleanText(request.service, 120),
        message: cleanText(request.message, 1500)
    };
    const digits = lead.phone.replace(/\D/g, "");

    if (!lead.name || !/^[0-9+()\s-]{8,24}$/.test(lead.phone) ||
        digits.length < 8 || digits.length > 15) {
        throw new Error("Name or phone number is invalid.");
    }

    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
        throw new Error("Email address is invalid.");
    }

    return lead;
}

function sendLeadNotification(lead, receivedAt) {
    const rows = [
        ["Name", lead.name],
        ["Phone", lead.phone],
        ["Email", lead.email || "Not provided"],
        ["Requested service", lead.service || "Not specified"],
        ["Message", lead.message || "Not provided"],
        ["Received", receivedAt.toLocaleString()]
    ];
    const htmlRows = rows.map(function (row) {
        return "<tr><th style=\"padding:10px;text-align:left;border:1px solid #d9e8f2;background:#f1f8fc\">" +
            escapeHtml(row[0]) +
            "</th><td style=\"padding:10px;border:1px solid #d9e8f2\">" +
            escapeHtml(row[1]) +
            "</td></tr>";
    }).join("");
    const options = {
        to: APPOINTMENT_RECIPIENTS,
        subject: "New appointment lead - " + lead.name,
        body: rows.map(function (row) {
            return row[0] + ": " + row[1];
        }).join("\n"),
        htmlBody:
            "<h2>New appointment lead</h2><table style=\"border-collapse:collapse\">" +
            htmlRows +
            "</table>",
        name: "Dr. Vinay Ausekar - Appointment Enquiry"
    };

    if (lead.email) {
        options.replyTo = lead.email;
    }

    MailApp.sendEmail(options);
}

function cacheResult(requestId, result) {
    CacheService.getScriptCache().put(
        "appointment_status_" + requestId,
        JSON.stringify(result),
        300
    );
}

function jsonResponse(result) {
    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}

function cleanText(value, maxLength) {
    return String(value || "")
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .trim()
        .slice(0, maxLength);
}

function asPlainText(value) {
    return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
