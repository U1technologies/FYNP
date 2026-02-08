/**
 * FYNP OTP Authentication Screen
 * Mobile-based OTP login integrated with backend
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { colors, spacing } from '../../theme';
import globalStyles from '../../styles/globalStyles';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { useThemeStore } from '../../store/themeStore';

const OTPLoginScreen = ({ navigation }) => {
    const { login: storeLogin } = useAuthStore();
    const { isDarkMode } = useThemeStore();
    const theme = isDarkMode ? colors : colors.light;

    // State
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState('mobile'); // 'mobile' | 'otp'
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [error, setError] = useState('');

    // OTP Input Refs
    const otpRefs = useRef([]);

    // Timer Effect
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Validate Mobile Number
    const validateMobile = () => {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobile) {
            setError('Mobile number is required');
            return false;
        }
        if (!mobileRegex.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return false;
        }
        setError('');
        return true;
    };

    // Send OTP
    const handleSendOtp = async () => {
        if (!validateMobile()) return;

        try {
            setLoading(true);
            setError('');

            const response = await authService.sendOtp(mobile);

            if (response.success) {
                setStep('otp');
                setResendTimer(60); // 60 seconds cooldown
                Alert.alert('Success', 'OTP sent successfully to your mobile number');

                // Auto-focus first OTP input
                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);
            } else {
                setError(response.message || 'Failed to send OTP');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Send OTP error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await authService.verifyOtp(mobile, otpValue);

            if (response.success) {
                // Extract data from response
                const { token, refreshToken, user } = response.data;

                // Store auth data with refresh token
                await storeLogin(token, user, refreshToken);
                // Navigation handled automatically by auth state
            } else {
                setError(response.message || 'Invalid OTP');
                // Clear OTP on error
                setOtp(['', '', '', '', '', '']);
                otpRefs.current[0]?.focus();
            }
        } catch (error) {
            setError('Verification failed. Please try again.');
            console.error('Verify OTP error:', error);
            setOtp(['', '', '', '', '', '']);
            otpRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP Input Change
    const handleOtpChange = (value, index) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all 6 digits entered
        if (index === 5 && value) {
            const fullOtp = [...newOtp];
            fullOtp[5] = value;
            if (fullOtp.every(digit => digit !== '')) {
                setTimeout(() => {
                    handleVerifyOtp();
                }, 100);
            }
        }
    };

    // Handle OTP Backspace
    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    // Resend OTP
    const handleResendOtp = () => {
        if (resendTimer > 0) return;
        setOtp(['', '', '', '', '', '']);
        handleSendOtp();
    };

    // Edit Mobile Number
    const handleEditMobile = () => {
        setStep('mobile');
        setOtp(['', '', '', '', '', '']);
        setError('');
        setResendTimer(0);
    };

    if (loading) {
        return <Loader fullScreen text={step === 'mobile' ? 'Sending OTP...' : 'Verifying OTP...'} />;
    }

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={globalStyles.flex1}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled">

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[globalStyles.heading1, { color: theme.textPrimary }]}>
                            {step === 'mobile' ? 'Welcome to FYNP' : 'Verify OTP'}
                        </Text>
                        <Text style={[globalStyles.bodySmall, styles.subtitle, { color: theme.textSecondary }]}>
                            {step === 'mobile'
                                ? 'Enter your mobile number to get started'
                                : `We've sent a 6-digit OTP to +91 ${mobile}`}
                        </Text>
                    </View>

                    {/* Mobile Input Step */}
                    {step === 'mobile' && (
                        <View style={styles.form}>
                            <View style={styles.mobileInputContainer}>
                                <View style={[styles.countryCode, { backgroundColor: theme.muted, borderColor: theme.border }]}>
                                    <Text style={[styles.countryCodeText, { color: theme.textPrimary }]}>+91</Text>
                                </View>
                                <TextInput
                                    style={[
                                        styles.mobileInput,
                                        {
                                            backgroundColor: theme.card,
                                            color: theme.textPrimary,
                                            borderColor: error ? colors.destructive : theme.border
                                        }
                                    ]}
                                    value={mobile}
                                    onChangeText={(text) => {
                                        // Only allow numbers and max 10 digits
                                        if (/^\d{0,10}$/.test(text)) {
                                            setMobile(text);
                                            setError('');
                                        }
                                    }}
                                    placeholder="Enter 10-digit mobile number"
                                    placeholderTextColor={theme.textMuted}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    autoFocus
                                />
                            </View>

                            {error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}

                            <Button
                                title="Send OTP"
                                onPress={handleSendOtp}
                                fullWidth
                                style={styles.sendButton}
                                disabled={mobile.length !== 10}
                            />

                            <View style={styles.divider}>
                                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                                <Text style={[styles.dividerText, { color: theme.textMuted }]}>OR</Text>
                                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                            </View>

                            <TouchableOpacity
                                style={[styles.altLoginButton, { borderColor: theme.border }]}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={[styles.altLoginText, { color: theme.textSecondary }]}>
                                    Login with Email & Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* OTP Input Step */}
                    {step === 'otp' && (
                        <View style={styles.form}>
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) => (otpRefs.current[index] = ref)}
                                        style={[
                                            styles.otpInput,
                                            {
                                                backgroundColor: theme.card,
                                                color: theme.textPrimary,
                                                borderColor: digit ? colors.primary : theme.border
                                            }
                                        ]}
                                        value={digit}
                                        onChangeText={(value) => handleOtpChange(value, index)}
                                        onKeyPress={(e) => handleOtpKeyPress(e, index)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        selectTextOnFocus
                                    />
                                ))}
                            </View>

                            {error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}

                            <Button
                                title="Verify OTP"
                                onPress={handleVerifyOtp}
                                fullWidth
                                style={styles.verifyButton}
                            />

                            <View style={styles.resendContainer}>
                                {resendTimer > 0 ? (
                                    <Text style={[styles.resendTimer, { color: theme.textMuted }]}>
                                        Resend OTP in {resendTimer}s
                                    </Text>
                                ) : (
                                    <TouchableOpacity onPress={handleResendOtp}>
                                        <Text style={[styles.resendText, { color: colors.primary }]}>
                                            Resend OTP
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <TouchableOpacity
                                style={styles.editMobileButton}
                                onPress={handleEditMobile}>
                                <Text style={[styles.editMobileText, { color: theme.textSecondary }]}>
                                    Change Mobile Number
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.textMuted }]}>
                            By continuing, you agree to FYNP's{' '}
                            <Text style={{ color: colors.primary }}>Terms of Service</Text> and{' '}
                            <Text style={{ color: colors.primary }}>Privacy Policy</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        padding: spacing.screenPadding,
    },
    header: {
        marginTop: spacing['4xl'],
        marginBottom: spacing['3xl'],
    },
    subtitle: {
        marginTop: spacing.sm,
        lineHeight: 20,
    },
    form: {
        flex: 1,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: spacing.md,
    },
    countryCode: {
        width: 60,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
    },
    mobileInput: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    errorText: {
        color: colors.destructive,
        fontSize: 12,
        marginTop: -8,
        marginBottom: spacing.md,
    },
    sendButton: {
        marginTop: spacing.md,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        fontSize: 12,
        fontWeight: '500',
    },
    altLoginButton: {
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    altLoginText: {
        fontSize: 14,
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
        gap: 8,
    },
    otpInput: {
        flex: 1,
        height: 56,
        borderRadius: 8,
        borderWidth: 2,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    verifyButton: {
        marginTop: spacing.md,
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    resendTimer: {
        fontSize: 14,
    },
    resendText: {
        fontSize: 14,
        fontWeight: '600',
    },
    editMobileButton: {
        alignItems: 'center',
        marginTop: spacing.md,
    },
    editMobileText: {
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: spacing.xl,
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default OTPLoginScreen;
