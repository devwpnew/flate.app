import { View } from "react-native";

import CollectionsItem from "./collectionsItem";

export default function CollectionsSortList({ status, collections }) {


  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      {collections &&
        collections.map((collection) => <CollectionsItem {...collection} />)}
    </View>
  );
}
