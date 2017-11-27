import FormSchema from 'vue-json-schema'
import VForm from '../../node_modules/vuetify/es5/components/VForm'
import VTextField from '../../node_modules/vuetify/es5/components/VTextField'
import VRadioGroup from '../../node_modules/vuetify/es5/components/VRadioGroup'
import VCheckbox from '../../node_modules/vuetify/es5/components/VCheckbox'
import VSelect from '../../node_modules/vuetify/es5/components/VSelect'

import VSubheader from '../../node_modules/vuetify/es5/components/VSubheader'

FormSchema.setComponent('text', VTextField)
FormSchema.setComponent('email', VTextField)
FormSchema.setComponent('textarea', VTextField)
FormSchema.setComponent('checkbox', VCheckbox)
FormSchema.setComponent('radio', VRadioGroup)
FormSchema.setComponent('select', VSelect)

// The third argument can also be a function that return an object
FormSchema.setComponent('form', VForm, ({ vm }) => {
    // vm is the FormSchema VM
  const model = vm.data
  const rules = {}

  vm.fields.forEach((field) => {
    rules[field.name] = {
      required: field.required,
      message: field.title
    }
  })

    // returning the form props
  return { rules, model }
})

// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
FormSchema.setComponent('title', VSubheader)

export {FormSchema}
