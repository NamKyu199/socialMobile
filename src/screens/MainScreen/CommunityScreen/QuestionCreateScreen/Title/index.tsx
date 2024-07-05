import React from "react";
import { Text, TextInput, View } from "react-native";

const Title = ({styles, values, handleChange, setFieldTouched}: any) => {
    return (
        <>
            <View style={styles.textView}>
                <Text style={styles.text}>Tiêu đề</Text>
                <TextInput
                    style={{ fontSize: 16 }}
                    placeholder="Nhập tiêu đề câu hỏi..."
                    placeholderTextColor={'rgba(166, 166, 166, 1)'}
                    multiline={true}
                    autoCorrect={false}
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title')}
                />
            </View>
        </>
    )
}

export default Title;