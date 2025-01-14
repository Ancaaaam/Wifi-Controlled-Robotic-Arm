$.ajaxSetup({timeout:7000});

var step = 0;

let commandStats = {
    success: 0,
    timeout: 0,
    reset: 0
};


$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(function() { defer.resolve(); }, ms);
    return defer;
};

function moveSrs(angle1, angle2, angle3, angle4)
{
	TextVar = myform2.inputbox.value;
	ArduinoVar = "http://" + TextVar + ":80";
	
	//add zeros
	if (angle1 < 100) {
		angle1 = "0" + angle1;
	}
	if (angle2 < 100) {
		angle2 = "0" + angle2;
	}
	if (angle3 < 100) {
		angle3 = "0" + angle3;
	}
	if (angle4 < 100) {
		angle4 = "0" + angle4;
	}
	if (angle1 < 10) {
		angle1 = "0" + angle1;
	}
	if (angle2 < 10) {
		angle2 = "0" + angle2;
	}
	if (angle3 < 10) {
		angle3 = "0" + angle3;
	}
	if (angle4 < 10) {
		angle4 = "0" + angle4;
	}

   addNotification(`Trimit comanda: ${angle1}, ${angle2}, ${angle3}, ${angle4}`);

	
	//send command
	$.wait(5000).then($.get(ArduinoVar, { "srs": angle1 + " " + angle2 + " " + angle3 + " " + angle4 })
    
        .done((data) => {
            if(data.trim() == "OK") {
                addNotification("Comanda trimisa cu succes!");
            } else if (data.trim() == "ERROR: 0,0,0,0 received") {
                addNotification("Eroare: Hardware-ul a detectat un reset cu valori 0,0,0,0!");
            }
             else {
                addNotification(`Raspuns neasteptat: ${data}`);
            }
        })
        .fail((error) => {
            addNotification(`Eroare la trimiterea comenzii: ${error.statusText}`);
			console.log(JSON.stringify(error));
        }));
	{Connection: close};
	
}

function addNotification(message) {
    const notificationArea = document.getElementById("notifications");
    const newNotification = document.createElement("p");
    newNotification.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    notificationArea.appendChild(newNotification);
    notificationArea.scrollTop = notificationArea.scrollHeight; // Scroll automat la ultima notificare

    // Track stats
    if (message.includes("trimisa cu succes")) commandStats.success++;
    if (message.includes("Eroare la trimiterea comenzii")) commandStats.timeout++;
    if (message.includes("Hardware-ul a detectat un reset")) commandStats.reset++;
}

function renderChart() {
    console.log("hehe");
    const chartCanvas = document.getElementById('chartCanvas');
    chartCanvas.style.display = chartCanvas.style.display === 'none' ? 'block' : 'none';

    if (!chartCanvas._chartInstance) {
        const ctx = chartCanvas.getContext('2d');
        chartCanvas._chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Succes', 'Timeout', 'Reset'],
                datasets: [{
                    label: 'Statistici Comenzi',
                    data: [commandStats.success, commandStats.timeout, commandStats.reset],
                    backgroundColor: ['#4caf50', '#f44336', '#2196f3']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        chartCanvas._chartInstance.data.datasets[0].data = [commandStats.success, commandStats.timeout, commandStats.reset];
        chartCanvas._chartInstance.update();
    }
    document.getElementById('toggleChartButton');

}



//update text under scroll bars
function updateTextInput1(val) {
    document.getElementById('s1textInput').value=val;
}
function updateTextInput2(val) {
    document.getElementById('s2textInput').value=val;
}
function updateTextInput3(val) {
    document.getElementById('s3textInput').value=val;
}
function updateTextInput4(val) {
    document.getElementById('s4textInput').value=val;
}


//add command to the stack
function addCommand(val1, val2, val3, val4, val7) {
	document.getElementById('inputTextToSave').value = document.getElementById('inputTextToSave').value + "sr1:" + val1 + " sr2:" + val2 + " sr3:" + val3 + " sr4:" + val4 +  " delay:" + val7 + String.fromCharCode(13, 10);
}

//clear command stack
function clearCommand() {
	document.getElementById('inputTextToSave').value = "";
}


function runCommands(val) {
	var k = 0;
	step = 0;
	var commands = val.split("\n"),i;
	for (i = 0; i < commands.length - 1; i++) {
			setTimeout(function(data){
				var angle1 = commands[step].split(" ")[0];
				angle1 = angle1.split(":")[1];
				var angle2 = commands[step].split(" ")[1];
				angle2 = angle2.split(":")[1];
				var angle3 = commands[step].split(" ")[2];
				angle3 = angle3.split(":")[1];
				var angle4 = commands[step].split(" ")[3];
				angle4 = angle4.split(":")[1];
                moveSrs(angle1, angle2, angle3, angle4);
				step+=1;
			},k);
			
			var tempo = commands[step].split(" ")[4];
			tempo = tempo.split(":")[1];
			k += parseInt(tempo);			
	}
}

// function runCommands(val) {
//     console.log(val);

//     // Parse commands from the stack
//     let commands = val.split("\n").filter(cmd => cmd.trim() !== ""); // Remove empty lines
//     let step = 0;

//     function executeCommand() {

//         // Parse the current command
//         let currentCommand = commands[step];

//         try {
//             let angle1 = currentCommand.split(" ")[0].split(":")[1];
//             let angle2 = currentCommand.split(" ")[1].split(":")[1];
//             let angle3 = currentCommand.split(" ")[2].split(":")[1];
//             let angle4 = currentCommand.split(" ")[3].split(":")[1];
//             let delay = parseInt(currentCommand.split(" ")[4].split(":")[1]);

//             // Execute the current command
//             moveSrs(angle1, angle2, angle3, angle4);

//             // Schedule the next command after the delay
//             setTimeout(() => {
//                 step++;
//                 executeCommand();
//             }, delay); // Add 1 second pause before the next command
//         } catch (error) {
//             console.error(`Error processing command: ${currentCommand}`, error);
//             step++; // Skip to the next command in case of error
//             executeCommand();
//         }
//     }

//     // Start executing commands
//     executeCommand();
// }



//save file with actual command stack
function saveTextAsFile()
{
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
 
 //load  file with a command stack
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}