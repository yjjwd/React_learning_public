let n = 0 ;
function AutoAdd() {
$("[class='text fzdysk']").text(n++)
if (!$("[class='close-button ibg']").length) {
$("[class='button add ibg normal']").children(".fzdysk").click()
} else {
$("[class='close-button ibg']").click()
$("[class='button add ibg normal']").children(".fzdysk").click()
}
}
function main(){
   var interval= setInterval(()=>{
        if(n<=2000) AutoAdd();
        else clearInterval(interval);
    }, 100);
}
main();