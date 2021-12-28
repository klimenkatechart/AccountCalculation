namespace AccountCalc.Models
{
    public class Transaction
    {
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public string CreditDebitIndicator { get; set; }
        public string Status { get; set; }
        public DateTime BookingDate { get; set; }
        public string? MerchantDetails { get; set; }                   
    }
}
