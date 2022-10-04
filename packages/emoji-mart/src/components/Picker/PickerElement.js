import { render } from 'preact'

import { init } from '../../config'
import { ShadowElement } from '../HTMLElement'
import { Picker, PickerStyles } from '.'

export default class PickerElement extends ShadowElement {
  constructor(props) {
    if (props.customStyle != null && typeof props.customStyle !== 'string')
      throw new Error("'customStyle' prop must be string")

    super(props, {
      styles: props.customStyle
        ? `${PickerStyles}\n${props.customStyle}`
        : PickerStyles,
    })
  }

  async connectedCallback() {
    const pickerProps = await init(this.props, this)

    const {
      onEmojiSelect,
      onClickOutside,
      onAddCustomEmoji,
      getImageURL,
      getSpritesheetURL,
      onReady,
    } = this.props

    const props = {
      ...pickerProps,
      element: this,
      onEmojiSelect,
      onClickOutside,
      onAddCustomEmoji,
      getImageURL,
      getSpritesheetURL,
      onReady,
    }

    render(<Picker {...props} />, this.shadowRoot)
  }
}

if (!customElements.get('em-emoji-picker')) {
  customElements.define('em-emoji-picker', PickerElement)
}
