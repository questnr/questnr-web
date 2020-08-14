export class LoginResponse {
    loginSuccess: boolean;
    accessToken: string;
    userName: string;
    errorMessage: string;
    isFirstAttempt: boolean;
    communitySuggestion: boolean;
}