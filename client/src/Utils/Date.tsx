export function GetDateByTimestamp(t: number): string {
    // wtf 
    t*=1;

    var todate = new Date(t).getDate(); 
    var tomonth = new Date(t).getMonth() + 1;
    var toyear = new Date(t).getFullYear();
    var original_date = tomonth + '/' + todate + '/' + toyear;
    console.log(original_date);
    return original_date;
}
