import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/phone-number',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'phone-number',
    loadChildren: () => import('./phone-number/phone-number.module').then( m => m.PhoneNumberPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'set-location',
    loadChildren: () => import('./OtherComponents/set-location/set-location.module').then(m => m.SetLocationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./OtherComponents/stores/stores.module').then(m => m.StoresPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./OtherComponents/items/items.module').then(m => m.ItemsPageModule)
  },
  {
    path: 'variation-selection',
    loadChildren: () => import('./OtherComponents/variation-selection/variation-selection.module').then(m => m.VariationSelectionPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./ApplicationServices/ParkingService/parking/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'sbp',
    loadChildren: () => import('./ApplicationServices/SBPService/sbp/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./ApplicationServices/ParkingService/payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'sbp-payment',
    loadChildren: () => import('./ApplicationServices/SBPService/sbp-payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'mpesa-payment',
    loadChildren: () => import('./ApplicationServices/ParkingService/mpesa-payment/mpesa-payment.module').then(m => m.OrderPlacedPageModule)
  },
  {
    path: 'sbp-mpesa-payment',
    loadChildren: () => import('./ApplicationServices/SBPService/sbp-mpesa-payment/mpesa-payment.module').then(m => m.OrderPlacedPageModule)
  },
  {
    path: 'order-placed',
    loadChildren: () => import('./ApplicationServices/ParkingService/order-placed/order-placed.module').then(m => m.OrderPlacedPageModule)
  },
  {
    path: 'sbp-order-placed',
    loadChildren: () => import('./ApplicationServices/SBPService/sbp-order-placed/order-placed.module').then(m => m.OrderPlacedPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./OtherComponents/my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./OtherComponents/order-detail/order-detail.module').then(m => m.OrderDetailPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./OtherComponents/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./OtherComponents/my-account/my-account.module').then(m => m.MyAccountPageModule)
  },
  {
    path: 'saved-addresses',
    loadChildren: () => import('./OtherComponents/saved-addresses/saved-addresses.module').then(m => m.SavedAddressesPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'buyappalert',
    loadChildren: () => import('./OtherComponents/buyappalert/buyappalert.module').then(m => m.BuyappalertPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./OtherComponents/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'socila-login',
    loadChildren: () => import('./auth/socila-login/socila-login.module').then(m => m.SocilaLoginPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./OtherComponents/reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'add-review',
    loadChildren: () => import('./OtherComponents/add-review/add-review.module').then(m => m.AddReviewPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./OtherComponents/wallet/wallet.module').then(m => m.WalletPageModule)
  },
  {
    path: 'add-money',
    loadChildren: () => import('./OtherComponents/add-money/add-money.module').then(m => m.AddMoneyPageModule)
  },
  {
    path: 'vt-popup',
    loadChildren: () => import('./OtherComponents/vt-popup/vt-popup.module').then(m => m.VtPopupPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
