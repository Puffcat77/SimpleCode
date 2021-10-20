export class AppConfig {
  static userLanguage = navigator.language || navigator.userLanguage;
  static userLang = "en-EN";
  static offset = new Date().getTimezoneOffset();
  static dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
  };
  static emailValidationRegex = "[^\\s]\\w+\\@\\w+\\.\\w+"
  static salaryValidationRegex = "[\\d]+[\\.\\,]?\\d{0,2}"
  static nameValidationRegex = "[^\\d]+"
}