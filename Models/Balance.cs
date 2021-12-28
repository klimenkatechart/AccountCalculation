namespace AccountCalc.Models
{
    public class Balance
    {
        public decimal Amount { get; set; } = 0.00M;
        public string CreditDebitIndicator { get; set; }       
        public string? CreditLines { get; set; }
    }
}
