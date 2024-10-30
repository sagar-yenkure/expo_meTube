import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

type modalProps = {
  modalVisible: boolean;
  setModalVisible: (arg0: boolean) => void;
  item?: any;
  modalComponent?: any;
};

const ModalForm = ({
  modalVisible,
  setModalVisible,
  modalComponent,
}: modalProps) => {
  return (
    <View className="flex-1 justify-center items-center mt-3">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 w-full justify-center items-center bg-opacity-0">
          <View className="bg-black rounded-lg p-3 mx-4 shadow-lg">
            {modalComponent}
            <Pressable
              className="bg-gray-600 rounded-lg px-4 py-2 mt-4"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-white font-semibold text-center">
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalForm;
