export default {
  generateSchema: (updateItem, isUpdate) => {
    var generateField = function (value, key) {
      let field = {
        label: value.title,
        name: value.name,
        model: 'fields[' + key + '].value'
      }
      getFieldType(field, value)
      return field
    }
    var getFieldType = function (field, value) {
      switch (value.field_type) {
        case 0: field.type = 'vtext'
          field.inputType = 'text'
          field.required = value.var.not_null
          field.maxlength = value.max_length
          field.min = value.min_length
          field.veePipe = value.var.not_null ? '|required' : ''
          field.veePipe += (field.maxlength > 0 ? '|max:' + field.maxlength : '')
          field.veePipe += (field.min > 0 ? '|min:' + field.min : '')
          break
        case 1: field.type = 'vtext'
          field.inputType = 'number'
          field.required = value.var.not_null
          field.max = value.max_length
          field.min = value.min_length
          field.step = 0
          field.veePipe = 'numeric'
          field.veePipe += field.required > 0 ? '|required' : ''
          field.veePipe += field.min > 0 ? '|min_value:' + field.min : ''
          field.veePipe += field.max > 0 ? '|max_value:' + field.max : ''
          break
        case 2: field.type = 'vtext'
          field.inputType = 'number'
          field.required = value.var.not_null
          field.max = value.max_length
          field.min = value.min_length
          field.step = value.round_count
          field.veePipe = 'decimal:' + (value.round_count > 0 ? value.round_count : 0)
          field.veePipe += field.required > 0 ? '|required' : ''
          field.veePipe += field.min > 0 ? '|min_value:' + field.min : ''
          field.veePipe += field.max > 0 ? '|max_value:' + field.max : ''
          break
        case 3: field.type = 'vdatepicker'
          field.inputType = 'text'
          field.required = value.var.not_null
          break
        case 4: field.type = 'vtext'
          field.inputType = 'text'
          field.required = value.var.not_null
          break
          // case 5: field.type = 'select'
          //   field.required = value.var.not_null
          //   field.values = JSON.parse(value.items)
          //   break
        case 6: field.type = 'vswitch'
          field.textOn = value.var.true_value ? value.var.true_value : 'да'
          field.textOff = value.var.false_value ? value.var.false_value : 'нет'
          break
        case 9: field.type = 'vselect'
          field.required = value.var.not_null
          field.items = JSON.parse(value.items)
          field.veePipe = field.required > 0 ? '|required' : ''
          break
      }
    }
    let fields = []
    _.forEach(updateItem.fields, function (value, key) {
      if (!isUpdate) {
        if (value.field_type === 9) { // value.field_type === 5 ||
          let listItems = JSON.parse(value.items)
          value.value = listItems && listItems.length > 0 ? listItems[0].id : null
        }
        _.forEach(value.var, function (vValue, vKey) {
          if (vKey.indexOf('default_value') === 0) {
            updateItem.fields[key].value = vValue
          }
        })
      }
      if (value.field_type !== 5) {
        fields.push(generateField(value, key))
      }
    })
    return fields
  }
}
