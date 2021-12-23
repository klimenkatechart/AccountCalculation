namespace AccountCalc.Models
{
    public class Account
    {
        public string? accountId { get; set; }
        public string? currencyCode { get; set; }
        public string? displayName { get; set; }
        public string? accountType { get; set; }
        public string?  accountSubType { get; set; }
        public Identifier? identifiers { get; set; }
        public List<string>? parties { get; set; }
        public List<string>? standingOrders { get; set; }
        public List<string>? directDebits { get; set; }
        public Balances balances { get; set; } = new Balances();
        public List<Transaction>? transactions { get; set; }
        

    }
}
