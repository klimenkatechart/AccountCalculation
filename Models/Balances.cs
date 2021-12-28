namespace AccountCalc.Models
{
    public class Balances
    {
        public Balance Current { get; set; } = new Balance();
        public Balance Available { get; set; } = new Balance();
    }
}
