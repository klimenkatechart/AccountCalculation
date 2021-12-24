using AccountCalc.Models;
using AccountCalc.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountCalc.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAccountData()
        {   
            return Ok(await _accountService.GetAccountData());
        }
        [HttpPost("calculate")]
        public ActionResult CalculateAccount([FromBody] AccountInfo? accountInfo)
        {
            if (accountInfo is not null && accountInfo.accounts is not null) 
            {
                var info = _accountService.CalculateOutput(accountInfo);
                return Ok(info);
            }
            return NoContent();
        }
    }
}
