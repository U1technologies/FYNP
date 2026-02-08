
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Save, Calendar as CalendarIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import colors from '../../theme/colors';

// Define helper components OUTSIDE user component to prevent re-render focus loss
const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    editable = true,
    onPress, // Optional: Action on press (e.g. for Date Picker)
    icon, // Optional: Right icon
    // Theme props
    currentMutedText,
    currentCard,
    currentBorder,
    currentText,
    disabledBackground
}) => {
    const inputStyles = [
        styles.input,
        {
            backgroundColor: (editable && !onPress) ? currentCard : disabledBackground,
            borderColor: currentBorder,
            color: currentText,
            opacity: 1, // Reset opacity to use background color distinction
            paddingRight: icon ? 40 : 16 // Make space for icon
        }
    ];

    const content = (
        <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: currentMutedText }]}>{label}</Text>
            <View style={{ justifyContent: 'center' }}>
                <TextInput
                    style={inputStyles}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={currentMutedText}
                    keyboardType={keyboardType}
                    editable={editable && !onPress}
                />
                {icon && (
                    <View style={styles.rightIcon}>
                        {icon}
                    </View>
                )}
            </View>
        </View>
    );

    if (onPress && editable) {
        return (
            <TouchableOpacity onPress={onPress}>
                <View pointerEvents="box-only">
                    {content}
                </View>
            </TouchableOpacity>
        );
    }

    return content;
};

const SectionHeader = ({
    title,
    // Theme props
    colorsPrimary,
    currentBorder
}) => (
    <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colorsPrimary }]}>{title}</Text>
        <View style={[styles.sectionLine, { backgroundColor: currentBorder }]} />
    </View>
);

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useThemeStore();
    const { updateUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Date Picker State
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerValue, setDatePickerValue] = useState(new Date());
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    // Locked Fields State
    const [lockedFields, setLockedFields] = useState({
        firstName: false,
        lastName: false,
        dob: false,
        pan: false,
    });

    // Dynamic Theme
    const theme = isDarkMode ? colors : colors.light;
    const currentBackground = theme.background;
    const currentCard = theme.card;
    const currentText = theme.foreground;
    const currentMutedText = theme.mutedForeground;
    const currentBorder = theme.border;

    // Distinct background for locked/non-editable fields
    const disabledBackground = isDarkMode ? '#1e1d1dff' : 'rgba(0, 0, 0, 0.05)';

    // Helper object to pass theme props easily
    const inputThemeProps = {
        currentMutedText,
        currentCard,
        currentBorder,
        currentText,
        disabledBackground
    };

    // Form State
    const [personalData, setPersonalData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '', // YYYY-MM-DD
        pan: '',
        addressLine: '',
        city: '',
        pinCode: '',
    });

    const [employmentData, setEmploymentData] = useState({
        employmentType: 'SALARIED', // Default
        employerName: '',
        monthlyIncome: '',
        profession: '',
        annualTurnover: '',
        businessType: '',
    });

    // Fetch Data on Mount
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setFetching(true);
            const res = await authService.getProfile();
            if (res.success && res.data?.user) {
                const user = res.data.user;
                const p = user.personal || {};
                const e = user.employment || {};

                setPersonalData({
                    firstName: p.firstName || '',
                    lastName: p.lastName || '',
                    email: p.email || '',
                    dob: p.dob ? p.dob.split('T')[0] : '',
                    pan: p.pan || '',
                    addressLine: p.address?.addressLine || '',
                    city: p.address?.city || '',
                    pinCode: p.address?.pinCode || '',
                });

                // Lock fields if they have values
                setLockedFields({
                    firstName: !!p.firstName,
                    lastName: !!p.lastName,
                    dob: !!p.dob,
                    pan: !!p.pan,
                });

                setEmploymentData({
                    employmentType: e.employmentType || 'SALARIED',
                    employerName: e.salariedDetails?.employerName || '',
                    monthlyIncome: e.salariedDetails?.monthlyIncome?.toString() || '',
                    profession: e.professionalDetails?.profession || '',
                    annualTurnover: (e.professionalDetails?.annualTurnover || e.businessDetails?.annualTurnover)?.toString() || '',
                    businessType: e.businessDetails?.businessType || '',
                });
            }
        } catch (error) {
            console.error('Fetch profile error:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            if (selectedDate) {
                if (selectedDate > eighteenYearsAgo) {
                    Alert.alert("Invalid Age", "You must be at least 18 years old.");
                    return;
                }
                const formattedDate = selectedDate.toISOString().split('T')[0];
                setPersonalData({ ...personalData, dob: formattedDate });
                setDatePickerValue(selectedDate);
            }
        } else {
            // iOS: Update temporary value but keep modal open
            if (selectedDate) setDatePickerValue(selectedDate);
        }
    };

    const confirmIOSDate = () => {
        setShowDatePicker(false);
        if (datePickerValue > eighteenYearsAgo) {
            Alert.alert("Invalid Age", "You must be at least 18 years old.");
            return;
        }
        const formattedDate = datePickerValue.toISOString().split('T')[0];
        setPersonalData({ ...personalData, dob: formattedDate });
    };

    const handleSave = async () => {
        if (!personalData.firstName.trim()) {
            Alert.alert('Error', 'First Name is required');
            return;
        }

        try {
            setLoading(true);

            // payload for personal
            const personalPayload = {
                firstName: personalData.firstName,
                lastName: personalData.lastName,
                email: personalData.email || undefined,
                dob: personalData.dob || undefined,
                pan: personalData.pan || undefined,
                address: (personalData.addressLine || personalData.city || personalData.pinCode) ? {
                    addressLine: personalData.addressLine,
                    city: personalData.city,
                    pinCode: personalData.pinCode,
                } : undefined,
            };

            // payload for employment
            const employmentPayload = {
                employmentType: employmentData.employmentType,
                // Include fields only if valid to pass 'positive' validation
                employerName: employmentData.employerName || undefined,
                monthlyIncome: Number(employmentData.monthlyIncome) > 0 ? Number(employmentData.monthlyIncome) : undefined,
                profession: employmentData.profession || undefined,
                annualTurnover: Number(employmentData.annualTurnover) > 0 ? Number(employmentData.annualTurnover) : undefined,
                businessType: employmentData.businessType || undefined,
            };

            // 1. Update Personal
            const pRes = await authService.updatePersonalProfile(personalPayload);
            if (!pRes.success) throw new Error(pRes.message);

            // 2. Update Employment
            const eRes = await authService.updateEmploymentProfile(employmentPayload);
            if (!eRes.success) throw new Error(eRes.message);

            // 3. Refresh Local User Store with NEW data
            const finalRes = await authService.getProfile();
            if (finalRes.success && finalRes.data?.user) {
                updateUser(finalRes.data.user);
            }

            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <View style={[styles.container, { backgroundColor: currentBackground, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: currentBackground }]} edges={['top']}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: currentBorder }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={currentText} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: currentText }]}>Edit Profile</Text>
                <TouchableOpacity onPress={handleSave} disabled={loading}>
                    {loading ? <ActivityIndicator size="small" color={colors.primary} /> : <Save size={24} color={colors.primary} />}
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>

                    <SectionHeader
                        title="Personal Details"
                        colorsPrimary={colors.primary}
                        currentBorder={currentBorder}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <InputField
                                label="First Name"
                                value={personalData.firstName}
                                onChangeText={t => setPersonalData({ ...personalData, firstName: t })}
                                placeholder="Arjun"
                                editable={!lockedFields.firstName}
                                {...inputThemeProps}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <InputField
                                label="Last Name"
                                value={personalData.lastName}
                                onChangeText={t => setPersonalData({ ...personalData, lastName: t })}
                                placeholder="Kumar"
                                editable={!lockedFields.lastName}
                                {...inputThemeProps}
                            />
                        </View>
                    </View>

                    <InputField
                        label="Email"
                        value={personalData.email}
                        onChangeText={t => setPersonalData({ ...personalData, email: t })}
                        placeholder="arjun@example.com"
                        keyboardType="email-address"
                        {...inputThemeProps}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <InputField
                                label="DOB (YYYY-MM-DD)"
                                value={personalData.dob}
                                placeholder="Select Date"
                                editable={!lockedFields.dob}
                                onPress={!lockedFields.dob ? () => {
                                    setDatePickerValue(personalData.dob ? new Date(personalData.dob) : eighteenYearsAgo);
                                    setShowDatePicker(true);
                                } : null}
                                icon={<CalendarIcon size={20} color={currentMutedText} />}
                                {...inputThemeProps}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <InputField
                                label="PAN Number"
                                value={personalData.pan}
                                onChangeText={t => setPersonalData({ ...personalData, pan: t.toUpperCase() })}
                                placeholder="ABCDE1234F"
                                autoCapitalize="characters"
                                editable={!lockedFields.pan}
                                {...inputThemeProps}
                            />
                        </View>
                    </View>

                    {showDatePicker && (
                        Platform.OS === 'ios' ? (
                            <Modal
                                transparent={true}
                                animationType="slide"
                                visible={showDatePicker}
                                onRequestClose={() => setShowDatePicker(false)}
                            >
                                <View style={styles.iosModalContainer}>
                                    <View style={[styles.iosModalContent, { backgroundColor: currentCard }]}>
                                        <View style={styles.modalActions}>
                                            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.modalBtn}>
                                                <Text style={[styles.modalBtnText, { color: colors.destructive }]}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={confirmIOSDate} style={styles.modalBtn}>
                                                <Text style={[styles.modalBtnText, { color: colors.primary }]}>Done</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DateTimePicker
                                            value={datePickerValue}
                                            mode="date"
                                            display="inline"
                                            onChange={handleDateChange}
                                            maximumDate={eighteenYearsAgo}
                                            textColor={currentText}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        ) : (
                            <DateTimePicker
                                value={datePickerValue}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                maximumDate={eighteenYearsAgo}
                            />
                        )
                    )}

                    <SectionHeader
                        title="Address"
                        colorsPrimary={colors.primary}
                        currentBorder={currentBorder}
                    />

                    <InputField
                        label="Address Line"
                        value={personalData.addressLine}
                        onChangeText={t => setPersonalData({ ...personalData, addressLine: t })}
                        placeholder="House, Street, Area"
                        {...inputThemeProps}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <InputField
                                label="City"
                                value={personalData.city}
                                onChangeText={t => setPersonalData({ ...personalData, city: t })}
                                placeholder="Mumbai"
                                {...inputThemeProps}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <InputField
                                label="Pincode"
                                value={personalData.pinCode}
                                onChangeText={t => setPersonalData({ ...personalData, pinCode: t })}
                                placeholder="400001"
                                keyboardType="numeric"
                                {...inputThemeProps}
                            />
                        </View>
                    </View>

                    <SectionHeader
                        title="Employment"
                        colorsPrimary={colors.primary}
                        currentBorder={currentBorder}
                    />

                    <Text style={[styles.label, { color: currentMutedText, marginBottom: 8 }]}>Employment Type</Text>
                    <View style={styles.typeRow}>
                        {['SALARIED', 'SELF_EMPLOYED_PROFESSIONAL', 'SELF_EMPLOYED_BUSINESS'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.typeChip,
                                    { borderColor: currentBorder },
                                    employmentData.employmentType === type && { backgroundColor: colors.primary, borderColor: colors.primary }
                                ]}
                                onPress={() => setEmploymentData({ ...employmentData, employmentType: type })}
                            >
                                <Text style={[
                                    styles.typeText,
                                    { color: currentText },
                                    employmentData.employmentType === type && { color: '#fff' }
                                ]}>
                                    {type === 'SALARIED' ? 'SALARIED' :
                                        type === 'SELF_EMPLOYED_PROFESSIONAL' ? 'PROFESSIONAL' :
                                            type === 'SELF_EMPLOYED_BUSINESS' ? 'BUSINESS' : type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {employmentData.employmentType === 'SALARIED' && (
                        <>
                            <InputField
                                label="Employer Name"
                                value={employmentData.employerName}
                                onChangeText={t => setEmploymentData({ ...employmentData, employerName: t })}
                                placeholder="Company Name"
                                {...inputThemeProps}
                            />
                            <InputField
                                label="Monthly Income"
                                value={employmentData.monthlyIncome}
                                onChangeText={t => setEmploymentData({ ...employmentData, monthlyIncome: t })}
                                placeholder="50000"
                                keyboardType="numeric"
                                {...inputThemeProps}
                            />
                        </>
                    )}

                    {employmentData.employmentType === 'SELF_EMPLOYED_PROFESSIONAL' && (
                        <>
                            <InputField
                                label="Profession"
                                value={employmentData.profession}
                                onChangeText={t => setEmploymentData({ ...employmentData, profession: t })}
                                placeholder="Doctor, Lawyer, etc."
                                {...inputThemeProps}
                            />
                            <InputField
                                label="Annual Income"
                                value={employmentData.annualTurnover}
                                onChangeText={t => setEmploymentData({ ...employmentData, annualTurnover: t })}
                                placeholder="500000"
                                keyboardType="numeric"
                                {...inputThemeProps}
                            />
                        </>
                    )}

                    {employmentData.employmentType === 'SELF_EMPLOYED_BUSINESS' && (
                        <>
                            <InputField
                                label="Business Type"
                                value={employmentData.businessType}
                                onChangeText={t => setEmploymentData({ ...employmentData, businessType: t })}
                                placeholder="Retail, Manufacturing, etc."
                                {...inputThemeProps}
                            />
                            <InputField
                                label="Annual Turnover"
                                value={employmentData.annualTurnover}
                                onChangeText={t => setEmploymentData({ ...employmentData, annualTurnover: t })}
                                placeholder="1000000"
                                keyboardType="numeric"
                                {...inputThemeProps}
                            />
                        </>
                    )}

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: colors.primary }]}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Profile</Text>
                        )}
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    backBtn: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10,
    },
    sectionLine: {
        flex: 1,
        height: 1,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        fontSize: 16,
    },
    rightIcon: {
        position: 'absolute',
        right: 16,
        top: 15,
    },
    row: {
        flexDirection: 'row',
    },
    typeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 8,
    },
    typeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    saveButton: {
        marginVertical: 24,
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // iOS Modal Styles
    iosModalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    iosModalContent: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    modalBtn: {
        padding: 8,
    },
    modalBtnText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfileScreen;
