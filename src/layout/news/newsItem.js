
import { View } from 'react-native'
import Paragraph from '../../ui/text/paragraph'

export default function NewsItemBubble({variant, name, link}) {
  return (
    <View>
      <Paragraph>{name}</Paragraph>
    </View>
  )
}
