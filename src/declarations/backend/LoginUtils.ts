import { AuthClient } from '@dfinity/auth-client';

export const loginWithICP = async (): Promise<boolean> => {
  const authClient = await AuthClient.create(); // Create an AuthClient instance
  const identityProviderUrl = 'https://identity.ic0.app/#authorize';

  // Trigger the login flow
  try {
    await authClient.login({
      identityProvider: identityProviderUrl,
      onSuccess: () => {
        console.log("Successfully logged in");
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    });

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
