using System.Text.RegularExpressions;

namespace AccountCalc.Helpers
{
    public static class PathFindHelper
    {
        public static string ToApplicationPath()
        {
            var exePath = Path.GetDirectoryName(System.Reflection
                                .Assembly.GetEntryAssembly().CodeBase);
            Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
            var appRoot = appPathMatcher.Match(exePath).Value;
            return Path.Combine(appRoot);
        }
    }
}
