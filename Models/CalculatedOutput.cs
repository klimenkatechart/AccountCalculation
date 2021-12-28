namespace AccountCalc.Models
{
    public class CalculatedOutput
    {
        public int TotalCredits { get; set; }
        public int TotalDebits { get; set; }
        public List<EndOfDayBalance> EndOfDayBalances { get; set; }
    }
}
