export class GlobalConstants {
  public static siteTitle = 'Questnr';
  public static siteLink = "https://questnr.com";
  public static siteLogo = "https://questnr.com/assets/logo.png";
  public static description = 'The New Era of Online Communities. Having real social contacts can sometimes be difficult. With a bit of a FUN, everthing becomes much simpler!';
  public static image = '';
  public static fbAppId = "1336590906533811";

  public static signUpAgeRestriction = 16;

  public static feedPath = 'feed';
  public static termsPath = 'terms';
  public static policyPath = 'policy';
  public static cookiePath = 'cookie';
  public static userPath = 'user';
  public static communityPath = 'community';
  public static postPath = 'post';
  public static hashTagPath = 'hash-tag';
  public static headerPath = 'header';
  public static explorePath = 'explore';
  public static contactPath = 'contact';

  public static supportEmail = "support@questnr.com";
  public static noReplyEmail = "noreply@questnr.com";
  public static helloEmail = "hello@questnr.com";
  public static addressLine1 = "New Delhi, India";
  public static termsLastUpdated = "May 25, 2020";
  public static privacyLastUpdated = "May 25, 2020";
  public static copyRightRenewedYear = "2020";
  public static resetPassword = "reset";
  public static forgotPassword = "forgot-password";
  public static login = "login";
  public static signUp = "sign-up";



  public static getPolicyLink(): string {
    return this.siteLink + "/policy";
  }
}
