namespace AccountCalc.Models
{
    public class Balances
    {
        public Balance current { get; set; } = new Balance();
        public Balance available { get; set; } = new Balance();
    }
}
