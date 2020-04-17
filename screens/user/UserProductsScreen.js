import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

import Colors from '../../constants/Colors';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {}}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {}}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-user-secret" : "ios-menu"}
            onPress={() => {
              navigationData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    }
  };
};

export default UserProductsScreen;
