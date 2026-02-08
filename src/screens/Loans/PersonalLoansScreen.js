import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { ArrowLeft, Search } from 'lucide-react-native';
import PersonalLoanContent from './components/PersonalLoanContent';

const PersonalLoansScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#09090b" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <ArrowLeft size={20} color="#ffffff" />
                </TouchableOpacity>
                <Text
                    style={styles.headerTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Personal Loans
                </Text>
                <TouchableOpacity style={styles.searchBtn}>
                    <Search size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <PersonalLoanContent />
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // Header
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
    },

    backBtn: {
        minWidth: 40,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        flexShrink: 0,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        flex: 1,
        letterSpacing: 0.3,
        marginHorizontal: 8,
    },

    searchBtn: {
        minWidth: 40,
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        flexShrink: 0,
    },
});

export default PersonalLoansScreen;
