function copyText(textareaId) {
  const textarea = document.getElementById(textareaId);
  textarea.select();
  document.execCommand("copy");

  copButtonAnimation(textareaId + "-copyBtn");
}

function generateCode() {
  const field = document.getElementById("field").value;
  const label = document.getElementById("label").value;

  var openTag = `<dxi-item dataField="${field}" [label]="{ text: '${label}' }">`;
  const closeTag = `\n</dxi-item>`;

  

  var lookup = `\n\t<dk-ct-gen-lookup
    [selectedValue]="---?.${field}"
    (valueChange)="---.${field} = $event?.value"
    [lookUpType]="'---'"
    [labelMode]="labelMode"
    [label]="'${label}'"
    [readOnly]="!editMode && state !== 'New'"
    ></dk-ct-gen-lookup>`;

  var controller = `<dk-ctl-gen-kontrol
      (dataResult)="---.${field} = $event?.---"
      [controlName]="'---'"
      [labelText]="'${label}'"
      [code]="---?.${field}"
      [labelMode]="labelMode"
      [isReadOnly]="!editMode && state !== 'New'"
      ></dk-ctl-gen-kontrol>\n`;

  if (document.getElementById("validationCheckbox").checked) {
    openTag =
      openTag.slice(0, -1) +
      `[validationRules]="validationRulesMap['${field}']"` +
      openTag.slice(-1);
    lookup =
      lookup.slice(0, -20) +
      `[validationRules]="validationRulesMap['${field}']"` +
      lookup.slice(-20);
    controller =
      controller.slice(0, -22) +
      `[validationRules]="validationRulesMap['${field}']"` +
      controller.slice(-22);
  }

  var itemCode = openTag + closeTag;
  var lookupCode = openTag + lookup + closeTag;
  var controllerCode = openTag + controller + closeTag;

  if (document.getElementById("stringOption").checked) {
    console.log(document.getElementById("stringOption").checked);
  } else if (document.getElementById("numberOption").checked) {
    itemCode =
      itemCode.slice(0, -1) +
      `[editorType]="'dxNumberBox'"` +
      itemCode.slice(-1);
    lookup =
      lookup.slice(0, -20) +
      `\n\t[valueExpr]="'kod'"` +
      lookup.slice(-20);
      lookup = lookup.replace("$event?.value", "$event")
    controller =
      controller.slice(0, -23) + `\n[type]="'number'"` + controller.slice(-23);
  } else if (document.getElementById("dateOption").checked) {
    openTag =
      openTag.slice(0, -1) + `\n\t[editorType]="'dxDateBox'"` + openTag.slice(-1);
  } else if (document.getElementById("textAreaOption".checked)) {
    openTag =
      openTag.slice(0, -1) + `\n\t[editorType]="'dxTextArea'"` + openTag.slice(-1);
  }

  itemCode = itemCode;
  lookupCode = openTag + lookup + closeTag;
  controllerCode = openTag + controller + closeTag;


  
  

  document.getElementById("item-text").innerHTML = itemCode;
  if (
    document.getElementById("stringOption").checked ||
    document.getElementById("numberOption").checked
  ) {
    document.getElementById("lookup-text").innerHTML = lookupCode;
    document.getElementById("controller-text").innerHTML = controllerCode;
  } else {
    document.getElementById("lookup-text").innerHTML = "";
    document.getElementById("controller-text").innerHTML = "";
  }
}

function copButtonAnimation(btnId) {
  const copyButton = document.getElementById(btnId);
  copyButton.innerText = "✔";
  copyButton.style.backgroundColor = "#2fc351";

  // Bildirimi 2 saniye sonra gizle
  setTimeout(() => {
    copyButton.innerText = "Kopyala";
    copyButton.style.backgroundColor = "#007bff";
  }, 1000);
}
