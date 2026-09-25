import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axiosInstance from '../api/axios';

const { height } = Dimensions.get('window');

const EventDetailsModal = ({ visible, onClose, event }) => {
    const imageUrl = event?.image ? `${axiosInstance.defaults.baseURL.replace('/api', '')}${event.image}` : null;

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header Image Section */}
                    <View style={styles.imageContainer}>
                        <Image source={imageUrl ? { uri: imageUrl } : null} style={styles.headerImage} />
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>Event Detail</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
                        <View style={styles.contentPadding}>
                            <Text style={styles.title}>{event.title}</Text>
                            
                            {/* Stats/Info Row */}
                            <View style={styles.statsRow}>
                                <View style={styles.statBox}>
                                    <Ionicons name="calendar" size={20} color="#FFD301" />
                                    <Text style={styles.statLabel}>{new Date(event.date).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Ionicons name="time" size={20} color="#FFD301" />
                                    <Text style={styles.statLabel}>{event.time}</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Ionicons name="location" size={20} color="#FFD301" />
                                    <Text style={styles.statLabel} numberOfLines={1}>{event.location}</Text>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>About this event</Text>
                                <Text style={styles.description}>{event.description}</Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ticket Pricing & Availability</Text>
                                {event.tickets.map((ticket, index) => (
                                    <View key={index} style={styles.ticketCard}>
                                        <View style={styles.ticketPrimary}>
                                            <Text style={styles.ticketType}>{ticket.type}</Text>
                                            <Text style={styles.ticketPrice}>Rs. {ticket.price}</Text>
                                        </View>
                                        <View style={styles.ticketSecondary}>
                                            <Text style={[styles.availability, ticket.remainingQuantity === 0 && {color: '#f44336'}]}>
                                                {ticket.remainingQuantity > 0 ? `${ticket.remainingQuantity} Left` : 'Sold Out'}
                                            </Text>
                                            <View style={[styles.statusDot, {backgroundColor: ticket.remainingQuantity > 0 ? '#4CAF50' : '#f44336'}]} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.backBtn} onPress={onClose}>
                            <Text style={styles.backBtnText}>Close Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '92%', height: '85%', backgroundColor: '#0B1020', borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: '#24314F' },
    imageContainer: { width: '100%', height: 250, position: 'relative' },
    headerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    closeBtn: { position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
    categoryBadge: { position: 'absolute', bottom: 20, left: 20, backgroundColor: '#8B5CF6', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 10 },
    categoryText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
    scrollBody: { flex: 1 },
    contentPadding: { padding: 25 },
    title: { color: '#F8FAFC', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
    statBox: { flex: 1, backgroundColor: '#121B2E', padding: 12, borderRadius: 15, alignItems: 'center', gap: 5, borderWidth: 1, borderColor: '#24314F' },
    statLabel: { color: '#B7C1D9', fontSize: 11, fontWeight: '600' },
    section: { marginBottom: 30 },
    sectionTitle: { color: '#5EEAD4', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    description: { color: '#B7C1D9', fontSize: 15, lineHeight: 24 },
    ticketCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#121B2E', padding: 18, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#24314F' },
    ticketPrimary: { gap: 4 },
    ticketType: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
    ticketPrice: { color: '#5EEAD4', fontSize: 14 },
    ticketSecondary: { alignItems: 'flex-end', gap: 6 },
    availability: { color: '#34D399', fontSize: 12, fontWeight: 'bold' },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    footer: { padding: 25, borderTopWidth: 1, borderTopColor: '#24314F' },
    backBtn: { width: '100%', height: 55, borderRadius: 15, backgroundColor: '#121B2E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#24314F' },
    backBtnText: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' }
});

export default EventDetailsModal;
