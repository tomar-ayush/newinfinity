interface OtpEntry {
  otp: string;
  expires: number;
}

class OtpStorage {
  private storage: Map<string, OtpEntry>;

  constructor() {
    this.storage = new Map<string, OtpEntry>();
  }

  set(email: string, otpData: OtpEntry) {
    this.storage.set(email, otpData);
  }

  get(email: string): OtpEntry | undefined {
    return this.storage.get(email);
  }

  delete(email: string) {
    this.storage.delete(email);
  }

  cleanup() {
    const now = Date.now();
    for (const [email, otpEntry] of this.storage.entries()) {
      if (otpEntry.expires < now) {
        this.storage.delete(email);
      }
    }
  }
}

// Ensure singleton instance
export const otpStorage = new OtpStorage();
