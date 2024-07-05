import React from "react";
import { Text, TextInput, View } from "react-native";

const Description = ({styles, values, handleChange, setFieldTouched}: any) => {
    return (
        <>
            <View style={styles.textView}>
                <Text style={styles.text}>Mô tả</Text>
                <TextInput
                    style={{ fontSize: 16 }}
                    placeholder="Nhập mô tả câu hỏi..."
                    placeholderTextColor={'rgba(166, 166, 166, 1)'}
                    multiline={true}
                    autoCorrect={false}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}
                />
            </View>
        </>
    )
}

export default Description;