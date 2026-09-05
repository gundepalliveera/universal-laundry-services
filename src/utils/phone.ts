export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  error?: string;
}

/**
 * Validates and normalizes Indian mobile phone numbers.
 *
 * Supported formats:
 * - 9494913323
 * - +919494913323
 * - +91 9494913323
 * - +91-9494913323
 * - 919494913323
 *
 * Rules:
 * - +91 must be accepted.
 * - After +91, exactly 10 digits must be entered.
 * - Indian mobile number must start with 6, 7, 8, or 9.
 * - Allow spaces and hyphens.
 * - Do not reject +91 because of formatting.
 * - Store/normalize the number as +91XXXXXXXXXX.
 */
export function validateAndNormalizeIndianPhone(input: string): PhoneValidationResult {
  const trimmed = (input || "").trim();

  if (!trimmed) {
    return {
      isValid: false,
      normalized: "",
      error: "Enter a valid 10-digit mobile number",
    };
  }

  // Allow only +, digits, spaces, and hyphens.
  // Optional '+' can only be at the beginning.
  if (!/^\+?[\d\s-]+$/.test(trimmed)) {
    return {
      isValid: false,
      normalized: "",
      error: "Enter a valid 10-digit mobile number",
    };
  }

  // Remove spaces and hyphens
  const cleaned = trimmed.replace(/[\s-]+/g, "");

  let mobileDigits = "";

  if (cleaned.startsWith("+")) {
    if (!cleaned.startsWith("+91")) {
      return {
        isValid: false,
        normalized: "",
        error: "Enter a valid 10-digit mobile number",
      };
    }
    mobileDigits = cleaned.slice(3);
  } else if (cleaned.length === 12 && cleaned.startsWith("91")) {
    mobileDigits = cleaned.slice(2);
  } else if (cleaned.length === 10) {
    mobileDigits = cleaned;
  } else {
    return {
      isValid: false,
      normalized: "",
      error: "Enter a valid 10-digit mobile number",
    };
  }

  // Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(mobileDigits)) {
    return {
      isValid: false,
      normalized: "",
      error: "Enter a valid 10-digit mobile number",
    };
  }

  return {
    isValid: true,
    normalized: `+91${mobileDigits}`,
  };
}
