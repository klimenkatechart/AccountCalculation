namespace AccountCalc.Models
{
    public class Balance
    {
        public decimal amount { get; set; } = 0.00M;
        public string? creditDebitIndicator { get; set; }       
        public string? creditLines { get; set; }
    }
}
