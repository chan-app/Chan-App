import React from "react";
import { Map } from "immutable";
import { View, Text, Modal, FlatList } from "react-native";
import { Card } from "react-native-material-ui";
import Header from "../containers/Header";
import Image from "./Image";
import Description from "./Description";
import StyleConnect from "../containers/Styles";

const styles = {
  container: {
    flex: 1,
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  }
};

const getReplies = (post, postList) =>
  postList
    .toJS()
    .filter(item => (item.com || "").indexOf(post.get("no")) > -1)
    .map((item, index) => ({ ...item, index }));

const Empty = ({ textStyle }) => (
  <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
    <Text
      style={{
        ...textStyle,
        textAlign: "center",
        paddingTop: styles.container.marginTop * -1 + 15
      }}
    >
      No replies found.
    </Text>
  </View>
);

const SingleItem = ({ item, onClose }) => (
  <Card>
    <View style={{ paddingBottom: 15 }}>
      {item.get("tim") && <Image hideMore={true} item={item} />}
      {item.get("com") && (
        <Description hideMore={true} item={item} onLink={() => undefined} />
      )}
    </View>
  </Card>
);

const Options = ({ item, onClose, posts, bodyStyle, textStyle }) => {
  const replies = getReplies(item, posts);

  return (
    <Modal onRequestClose={onClose} animationType="slide" transparent={false}>
      <View style={{ flex: 1, backgroundColor: bodyStyle.backgroundColor }}>
        <Header title="Replies" home={false} refresh={false} onBack={onClose} />
        <View style={styles.container}>
          {replies.length > 0 ? (
            <FlatList
              keyExtractor={({ index }) => index}
              showsVerticalScrollIndicator={false}
              data={replies}
              renderItem={({ item }) => (
                <SingleItem onClose={onClose} item={Map(item)} />
              )}
            />
          ) : (
            <Empty textStyle={textStyle} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StyleConnect(Options);
