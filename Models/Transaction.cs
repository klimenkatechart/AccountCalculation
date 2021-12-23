namespace AccountCalc.Models
{
    public class Transaction
    {
         public string? description { get; set; }
        public decimal amount { get; set; }
        public string? creditDebitIndicator { get; set; }
        public string? status { get; set; }
        public DateTime bookingDate { get; set; }
        public string? merchantDetails { get; set; }                   
    }
}
