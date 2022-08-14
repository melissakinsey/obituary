const { prepareDocs } = require("mongodb/lib/operations/common_functions");

                var oDoc, sDefTxt;

                function initDoc()
                {
                    oDoc = document.getElementById("textBox");
                    sDefTxt = oDoc.innerHTML;
                    //if (document.compForm.switchMode.checked) { setDocMode(true); }
                }
                let copied = null
                function formatDoc(sCmd, sValue)
                {
                    //event.preventDefault()
                    if (validateMode())
                    {
                       oDoc.focus();
                        if (sCmd === 'copy')
                        {
                            //https://stackoverflow.com/questions/6300213/copy-selected-text-to-the-clipboard-without-using-flash-must-be-cross-browser
                            //https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
                            let selection = window.getSelection()
                                selection.anchorNode.data.slice(selection.anchorOffset,selection.focusOffset);
                           // console.log(copied);
                        } else {
                           // debugger
                            let res = document.execCommand(sCmd, false, sValue);
                        }
                    }
                }

                function validateMode()
                {
                    if (!document.compForm.switchMode.checked)
                    {
                        return true;
                    }
                    oDoc.focus();
                    alert("Uncheck \"Show HTML\".");
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