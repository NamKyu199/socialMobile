import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

const ModalDelete = ({ modalVisible, setModalVisible, handleDeleteQuestion, item }: any) => {
    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.container}>
                    <View style={styles.view}>
                        <Text style={styles.title}>
                            Xoá câu hỏi
                        </Text>
                        <Text style={styles.description}>
                            Bạn có chắc chắn xoá câu hỏi này không?
                        </Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textNo}>
                                    Không
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {
                                    handleDeleteQuestion(item.questionId)
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.textDel}>
                                    Xoá
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModalDelete;