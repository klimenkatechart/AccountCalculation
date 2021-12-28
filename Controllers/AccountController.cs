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
            var file = await _accountService.GetAccountData();
                if (file is null) return BadRequest();

            return Ok(await _accountService.GetAccountData());
        }

        [HttpGet("calculate")]
        public ActionResult CalculateAccount()
        {            
            var calculatedOutput = _accountService.CalculateOutput();
            if(calculatedOutput is null) return BadRequest();

                return Ok(calculatedOutput);
          
        }
    }
}
