namespace AccountCalc.Models
{
    public class AccountInfo
    {
    public string? BrandName { get; set; }
    public string? CataSourceName { get; set; }  
    public string? DataSourceType { get; set; }  
    public DateTime? RequestDateTime { get; set; }  
    public List<Account>? Accounts { get; set; }
    }
}
