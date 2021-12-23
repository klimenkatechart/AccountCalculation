using AccountCalc.Models;

namespace AccountCalc.Services
{
    public interface IAccountService
    {
        public Task<string> GetAccountData();
        public Task<CalculatedOutput> CalculateOutput(AccountInfo accountInfo);
        
    }
}
