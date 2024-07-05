import React, { useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {RichEditor, RichToolbar, actions} from "react-native-pell-rich-editor"

const RichText = () => {
    const richText = useRef(null);
    const [showSubToolBar, SetshowSubToolBar] = useState(false);

    const handleAction = (action: any) => {
        if (action === 'customAction') {
            SetshowSubToolBar(!showSubToolBar)
        }
    }
    
    return (
        <SafeAreaView>
            <Text>
                Rich Text
            </Text>
            <RichEditor 
                ref={richText}
                placeholder="Enter"
            />
            <RichToolbar 
                editor={richText}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    'customView',
                    actions.insertImage,
                    'customAction',
                ]}
                iconMap={{
                    'customView': () => <View />,
                    'customAction': () => <Text>Abc</Text>
                }}
                onPress={handleAction}
            />
            {showSubToolBar && (
                <View style={{borderWidth: 1, borderColor: 'red'}}>
                    <RichToolbar 
                        editor={richText}
                        action={[
                            actions.setBold
                        ]}
                    />
                </View>
            )}
            
        </SafeAreaView>
    )
}

export default RichText;