import { AuthClient } from '@dfinity/auth-client';

export interface LoginResult {
  success: boolean;
  error?: string;
}

// Custom error type to help with instanceof checks
export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
  }
}

export const loginWithICP = async (): Promise<LoginResult> => {
  try {
    // Create an AuthClient instance
    const authClient = await AuthClient.create();
    
    // Define a promise to wrap the login callback
    return new Promise<LoginResult>((resolve) => {
      authClient.login({
        identityProvider: 'https://identity.ic0.app/#authorize',
        onSuccess: () => {
          console.log("Successfully logged in");
          resolve({ success: true });
        },
        onError: (error) => {
          console.error("Login error:", error);
          resolve({ 
            success: false, 
            error: error ? String(error) : 'Unknown login error'
          });
        }
      });
    });

  } catch (error) {
    console.error("Login process failed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// Optional: Add a logout function
export const logoutFromICP = async (): Promise<LoginResult> => {
  try {
    const authClient = await AuthClient.create();
    await authClient.logout();
    return { success: true };
  } catch (error) {
    console.error("Logout failed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
};