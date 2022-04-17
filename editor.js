
                var oDoc, sDefTxt;

                function initDoc()
                {
                    oDoc = document.getElementById("textBox");
                    sDefTxt = oDoc.innerHTML;
                    //if (document.compForm.switchMode.checked) { setDocMode(true); }
                }

                function formatDoc(sCmd, sValue)
                {
                    if (validateMode()) { document.execCommand(sCmd, false, sValue); oDoc.focus(); }
                }

                function validateMode()
                {
                    if (!document.compForm.switchMode.checked) { return true; }
                    alert("Uncheck \"Show HTML\".");
                    oDoc.focus();
                    return false;
                }               

                function printDoc()
                {
                    if (!validateMode()) { return; }
                    var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
                    oPrntWin.document.open();
                    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
                    oPrntWin.document.close();
                }
                if (typeof window !== "undefined") {
                    // browser code
                  }