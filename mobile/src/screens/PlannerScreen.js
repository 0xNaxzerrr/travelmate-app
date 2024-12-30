import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function PlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planifier un voyage</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Où souhaitez-vous aller ?"
        />

        <Text style={styles.label}>Date de départ</Text>
        <TouchableOpacity style={styles.input}>
          <Text>Sélectionner une date</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Date de retour</Text>
        <TouchableOpacity style={styles.input}>
          <Text>Sélectionner une date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Créer le voyage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});