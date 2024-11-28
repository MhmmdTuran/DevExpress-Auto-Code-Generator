function copyText(textareaId) {
  const textarea = document.getElementById(textareaId);
  textarea.select();
  document.execCommand("copy");

  copButtonAnimation(textareaId + "-copyBtn");
}

function generateCode() {
  var generatedCode = "";

  const formData = document.getElementById("formData").value;

  const formTagOpen = `<dx-form
class="form"
[(formData)]="${formData}"
[labelMode]="labelMode"
[labelLocation]="labelLocation"
[readOnly]="!editMode && state !== 'New'">`;

  const formTagClose = `\n</dx-form>`;

  const dlist = JSON.parse(document.getElementById("dlist").value);

  // console.log(dlist.dListMetadata.fields[0])

  generatedCode += formTagOpen;

  dlist.dListMetadata.fields.forEach((field) => {
    if (field.dataField.includes(".")) {
      return;
    } else if (field.lookup) {
      generatedCode += generateLookup(field, formData);
    } else {
      generatedCode += generateNormalItem(field);
    }
  });

  generatedCode += formTagClose;

  document.getElementById("code-output").value = generatedCode;
}

function generateNormalItem(field) {
  if (field.dataType == "string" && field.dataLength > 200) {
    return `\n
    <dxi-item
    dataField="${field.dataField}"
    [label]="{ text: '${field.labelText}' }"
    [validationRules]="validationRulesMap['${field.dataField}']"
    editorType="dxTextArea"
    ></dxi-item>`;
  } else if (field.dataType == "string") {
    return `\n
    <dxi-item
    dataField="${field.dataField}"
    [label]="{ text: '${field.labelText}' }"
    [validationRules]="validationRulesMap['${field.dataField}']"
    ></dxi-item>`;
  } else if (field.dataType == "number") {
    return `\n
    <dxi-item
    dataField="${field.dataField}"
    [label]="{ text: '${field.labelText}' }"
    [validationRules]="validationRulesMap['${field.dataField}']"
    editorType="dxNumberBox"
    ></dxi-item>`;
  } else if (field.dataType == "date") {
    return `\n
    <dxi-item
    dataField="${field.dataField}"
    [label]="{ text: '${field.labelText}' }"
    [validationRules]="validationRulesMap['${field.dataField}']"
    editorType="dxDateBox"
    ></dxi-item>`;
  }
}

function generateLookup(field, formData) {
  if (field.dataType == "number") {
    return `\n
  <dxi-item
    dataField="${field.dataField}"
    [label]="{ text: '${field.labelText}' }"
    [validationRules]="validationRulesMap['${field.dataField}']"
    >
    <dk-ct-gen-lookup
      [selectedValue]="${formData}?.${field.dataField}"
      (valueChange)="${formData}.${field.dataField} = $event?.value"
      [lookUpType]="'${field.lookup}'"
      [label]="'${field.labelText}'"
      [readOnly]="!editMode && state !== 'New'"
      [validationRules]="validationRulesMap['${field.dataField}']"
      [valueExpr]="'kod'"
    ></dk-ct-gen-lookup>
  </dxi-item>`;
  } else {
    return `\n
      <dxi-item
      dataField="${field.dataField}"
      [label]="{ text: '${field.labelText}' }"
      [validationRules]="validationRulesMap['${field.dataField}']"
      >
        <dk-ct-gen-lookup
          [selectedValue]="${formData}?.${field.dataField}"
          (valueChange)="${formData}.${field.dataField} = $event?.value"
          [lookUpType]="'${field.lookup}'"
          [label]="'${field.labelText}'"
          [readOnly]="!editMode && state !== 'New'"
          [validationRules]="validationRulesMap['${field.dataField}']"
        ></dk-ct-gen-lookup>
      </dxi-item>`;
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
