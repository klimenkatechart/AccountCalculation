using AccountCalc.Helpers;
using AccountCalc.Models;
using Newtonsoft.Json;

namespace AccountCalc.Services
{
    public class AccountService : IAccountService
    {
       
        public async Task<string> GetAccountData()
        {
            string path = PathFindHelper.ToApplicationPath();

            string contentRootPath = PathFindHelper.ToApplicationPath() +FileRootHelper.AccountJSONRoot;  
            if (!File.Exists(contentRootPath) || new FileInfo(contentRootPath).Length == 0)
            {
                return null;
            }

            return await System.IO.File.ReadAllTextAsync(contentRootPath);     
        }
        public async Task<CalculatedOutput> CalculateOutput()
        {
            var accountJson = await GetAccountData();
            var accountInfo = JsonConvert.DeserializeObject<AccountInfo>(accountJson);

            CalculatedOutput calculatedOutput = new CalculatedOutput()
            {
                TotalCredits = 0,
                TotalDebits = 0,
                EndOfDayBalances = new List<EndOfDayBalance>()
            };

            foreach (var account in accountInfo.Accounts)
            {
                if (account.Transactions is null)
                    break;

                var currentBalance = account.Balances.Current.Amount;

                foreach (var transaction in account.Transactions)
                {
                    var endOfTheDayBalance = calculatedOutput.EndOfDayBalances.LastOrDefault();

                    if (endOfTheDayBalance is null|| endOfTheDayBalance.Date.Date != transaction.BookingDate.Date)
                    {
                        endOfTheDayBalance = new EndOfDayBalance() {
                            Date = transaction.BookingDate 
                        };
                        calculatedOutput.EndOfDayBalances.Add(endOfTheDayBalance);
                    }

                    
                   if(transaction.CreditDebitIndicator == TransactionIndicatorHelper.Credit)
                    {
                        calculatedOutput.TotalCredits++;
                        currentBalance -= transaction.Amount;
                    }
                    else
                    {
                        calculatedOutput.TotalDebits++;
                        currentBalance += transaction.Amount;
                    }
                   endOfTheDayBalance.Balance = currentBalance;
                }
            }
            return await Task.FromResult<CalculatedOutput>(calculatedOutput);
        }
    }
    
}
