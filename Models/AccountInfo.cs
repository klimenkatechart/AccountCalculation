namespace AccountCalc.Models
{
    public class AccountInfo
    {
    public string? brandName { get; set; }
    public string? dataSourceName { get; set; }  
    public string? dataSourceType { get; set; }  
    public DateTime? requestDateTime { get; set; }  
    public List<Account>? accounts { get; set; }
    }
}
