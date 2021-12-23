using AccountCalc.Models;

namespace AccountCalc.Services
{
    public class AccountService : IAccountService
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public AccountService(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public async Task<string> GetAccountData()
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            return await System.IO.File.ReadAllTextAsync(contentRootPath + "/Data/Account.json");
        }
        public async Task<CalculatedOutput> CalculateOutput(AccountInfo accountInfo)
        {
            if (accountInfo.accounts is null)
                return await Task.FromResult<CalculatedOutput>(new CalculatedOutput()) ;
            
            CalculatedOutput calculatedOutput = new CalculatedOutput()
            {
                TotalCredits = 0,
                TotalDebits = 0,
                EndOfDayBalances = new List<EndOfDayBalance>()
            };

            foreach (Account account in accountInfo.accounts)
            {
                if (account.transactions is null)
                    break;

                var currentBalance = account.balances.current.amount;

                foreach (Transaction tran in account.transactions)
                {
                    var endOfTheDayBalance = calculatedOutput.EndOfDayBalances.LastOrDefault();

                    if (endOfTheDayBalance is null|| endOfTheDayBalance.Date.Date != tran.bookingDate.Date)
                    {
                        endOfTheDayBalance = new EndOfDayBalance() {
                            Date = tran.bookingDate 
                        };
                        calculatedOutput.EndOfDayBalances.Add(endOfTheDayBalance);
                    }

                    
                   if(tran.creditDebitIndicator == "Credit")
                    {
                        calculatedOutput.TotalCredits++;
                        currentBalance -= tran.amount;
                    }
                    else
                    {
                        calculatedOutput.TotalDebits++;
                        currentBalance += tran.amount;
                    }
                   endOfTheDayBalance.Balance = currentBalance;
                }
            }
            return await Task.FromResult<CalculatedOutput>(calculatedOutput);
        }
    }
}
