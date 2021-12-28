namespace AccountCalc.Models
{
    public class Account
    {
        public string AccountId { get; set; }
        public string CurrencyCode { get; set; }
        public string DisplayName { get; set; }
        public string AccountType { get; set; }
        public string AccountSubType { get; set; }
        public Identifier? Identifiers { get; set; }
        public List<string>? Parties { get; set; }
        public List<string>? StandingOrders { get; set; }
        public List<string>? DirectDebits { get; set; }
        public Balances Balances { get; set; } = new Balances();
        public List<Transaction>? Transactions { get; set; }
        

    }
}
