namespace AccountCalc.Services
{
    public class AccountService : IAccountService
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public AccountService(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public string GetAccountData()
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            var JSON = System.IO.File.ReadAllText(contentRootPath + "/Data/Account.json");
            return JSON;
        }
    }
}
