(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './components/avatar/avatar', './components/backdrop/backdrop', './components/badge/badge', './components/button/button', './components/card/card', './components/checkbox/checkbox', './components/chip/chip', './components/content/content', './components/datetime/datetime', './components/fab/fab', './components/grid/grid', './components/icon/icon', './components/img/img', './components/infinite-scroll/infinite-scroll', './components/infinite-scroll/infinite-scroll-content', './components/app/app-root', './components/item/item', './components/item/item-reorder', './components/item/item-sliding', './components/label/label', './components/list/list', './components/list/list-header', './components/menu/menu', './components/menu/menu-close', './components/menu/menu-toggle', './components/input/native-input', './components/nav/nav', './components/nav/nav-pop', './components/nav/nav-push', './components/navbar/navbar', './components/note/note', './components/option/option', './components/nav/overlay-portal', './components/picker/picker-component', './components/radio/radio-button', './components/radio/radio-group', './components/range/range', './components/refresher/refresher', './components/refresher/refresher-content', './components/scroll/scroll', './components/searchbar/searchbar', './components/segment/segment', './components/select/select', './components/show-hide-when/show-hide-when', './components/slides/slides', './components/spinner/spinner', './components/tabs/tab', './components/tabs/tabs', './components/tabs/tab-button', './components/tabs/tab-highlight', './components/input/input', './components/thumbnail/thumbnail', './components/toggle/toggle', './components/toolbar/toolbar', './components/toolbar/toolbar-item', './components/toolbar/toolbar-title', './components/typography/typography', './components/virtual-scroll/virtual-scroll', './components/virtual-scroll/virtual-item', './components/action-sheet/action-sheet', './components/alert/alert', './components/app/app', './components/avatar/avatar', './components/backdrop/backdrop', './components/badge/badge', './components/button/button', './components/card/card', './components/checkbox/checkbox', './components/chip/chip', './components/content/content', './components/datetime/datetime', './components/fab/fab', './components/grid/grid', './components/icon/icon', './components/img/img', './components/infinite-scroll/infinite-scroll', './components/infinite-scroll/infinite-scroll-content', './components/input/input', './components/app/app-root', './components/item/item', './components/item/item-reorder', './components/item/item-sliding', './components/label/label', './components/list/list', './components/list/list-header', './components/loading/loading', './components/menu/menu', './components/menu/menu-close', './components/menu/menu-controller', './components/menu/menu-toggle', './components/menu/menu-types', './components/modal/modal', './components/nav/nav', './components/nav/nav-pop', './components/nav/nav-push', './components/navbar/navbar', './components/input/native-input', './components/note/note', './components/option/option', './components/nav/overlay-portal', './components/picker/picker', './components/popover/popover', './components/radio/radio-button', './components/radio/radio-group', './components/range/range', './components/refresher/refresher', './components/refresher/refresher-content', './components/scroll/scroll', './components/searchbar/searchbar', './components/segment/segment', './components/select/select', './components/show-hide-when/show-hide-when', './components/slides/slides', './components/spinner/spinner', './components/tabs/tab', './components/tabs/tabs', './components/tabs/tab-button', './components/tabs/tab-highlight', './components/tap-click/tap-click', './components/toast/toast', './components/toggle/toggle', './components/toolbar/toolbar', './components/toolbar/toolbar-item', './components/toolbar/toolbar-title', './components/thumbnail/thumbnail', './components/typography/typography', './components/virtual-scroll/virtual-scroll', './components/action-sheet/action-sheet-component', './components/alert/alert-component', './components/loading/loading-component', './components/modal/modal-component', './components/picker/picker-component', './components/popover/popover-component', './components/toast/toast-component'], factory);
    }
})(function (require, exports) {
    "use strict";
    var avatar_1 = require('./components/avatar/avatar');
    var backdrop_1 = require('./components/backdrop/backdrop');
    var badge_1 = require('./components/badge/badge');
    var button_1 = require('./components/button/button');
    var card_1 = require('./components/card/card');
    var checkbox_1 = require('./components/checkbox/checkbox');
    var chip_1 = require('./components/chip/chip');
    var content_1 = require('./components/content/content');
    var datetime_1 = require('./components/datetime/datetime');
    var fab_1 = require('./components/fab/fab');
    var grid_1 = require('./components/grid/grid');
    var icon_1 = require('./components/icon/icon');
    var img_1 = require('./components/img/img');
    var infinite_scroll_1 = require('./components/infinite-scroll/infinite-scroll');
    var infinite_scroll_content_1 = require('./components/infinite-scroll/infinite-scroll-content');
    var app_root_1 = require('./components/app/app-root');
    var item_1 = require('./components/item/item');
    var item_reorder_1 = require('./components/item/item-reorder');
    var item_sliding_1 = require('./components/item/item-sliding');
    var label_1 = require('./components/label/label');
    var list_1 = require('./components/list/list');
    var list_header_1 = require('./components/list/list-header');
    var menu_1 = require('./components/menu/menu');
    var menu_close_1 = require('./components/menu/menu-close');
    var menu_toggle_1 = require('./components/menu/menu-toggle');
    var native_input_1 = require('./components/input/native-input');
    var nav_1 = require('./components/nav/nav');
    var nav_pop_1 = require('./components/nav/nav-pop');
    var nav_push_1 = require('./components/nav/nav-push');
    var navbar_1 = require('./components/navbar/navbar');
    var note_1 = require('./components/note/note');
    var option_1 = require('./components/option/option');
    var overlay_portal_1 = require('./components/nav/overlay-portal');
    var picker_component_1 = require('./components/picker/picker-component');
    var radio_button_1 = require('./components/radio/radio-button');
    var radio_group_1 = require('./components/radio/radio-group');
    var range_1 = require('./components/range/range');
    var refresher_1 = require('./components/refresher/refresher');
    var refresher_content_1 = require('./components/refresher/refresher-content');
    var scroll_1 = require('./components/scroll/scroll');
    var searchbar_1 = require('./components/searchbar/searchbar');
    var segment_1 = require('./components/segment/segment');
    var select_1 = require('./components/select/select');
    var show_hide_when_1 = require('./components/show-hide-when/show-hide-when');
    var slides_1 = require('./components/slides/slides');
    var spinner_1 = require('./components/spinner/spinner');
    var tab_1 = require('./components/tabs/tab');
    var tabs_1 = require('./components/tabs/tabs');
    var tab_button_1 = require('./components/tabs/tab-button');
    var tab_highlight_1 = require('./components/tabs/tab-highlight');
    var input_1 = require('./components/input/input');
    var thumbnail_1 = require('./components/thumbnail/thumbnail');
    var toggle_1 = require('./components/toggle/toggle');
    var toolbar_1 = require('./components/toolbar/toolbar');
    var toolbar_item_1 = require('./components/toolbar/toolbar-item');
    var toolbar_title_1 = require('./components/toolbar/toolbar-title');
    var typography_1 = require('./components/typography/typography');
    var virtual_scroll_1 = require('./components/virtual-scroll/virtual-scroll');
    var virtual_item_1 = require('./components/virtual-scroll/virtual-item');
    var action_sheet_1 = require('./components/action-sheet/action-sheet');
    exports.ActionSheet = action_sheet_1.ActionSheet;
    exports.ActionSheetController = action_sheet_1.ActionSheetController;
    var alert_1 = require('./components/alert/alert');
    exports.Alert = alert_1.Alert;
    exports.AlertController = alert_1.AlertController;
    var app_1 = require('./components/app/app');
    exports.App = app_1.App;
    var avatar_2 = require('./components/avatar/avatar');
    exports.Avatar = avatar_2.Avatar;
    var backdrop_2 = require('./components/backdrop/backdrop');
    exports.Backdrop = backdrop_2.Backdrop;
    var badge_2 = require('./components/badge/badge');
    exports.Badge = badge_2.Badge;
    var button_2 = require('./components/button/button');
    exports.Button = button_2.Button;
    var card_2 = require('./components/card/card');
    exports.Card = card_2.Card;
    exports.CardContent = card_2.CardContent;
    exports.CardHeader = card_2.CardHeader;
    exports.CardTitle = card_2.CardTitle;
    var checkbox_2 = require('./components/checkbox/checkbox');
    exports.Checkbox = checkbox_2.Checkbox;
    var chip_2 = require('./components/chip/chip');
    exports.Chip = chip_2.Chip;
    var content_2 = require('./components/content/content');
    exports.Content = content_2.Content;
    var datetime_2 = require('./components/datetime/datetime');
    exports.DateTime = datetime_2.DateTime;
    var fab_2 = require('./components/fab/fab');
    exports.FabContainer = fab_2.FabContainer;
    exports.FabButton = fab_2.FabButton;
    exports.FabList = fab_2.FabList;
    var grid_2 = require('./components/grid/grid');
    exports.Grid = grid_2.Grid;
    exports.Row = grid_2.Row;
    exports.Col = grid_2.Col;
    var icon_2 = require('./components/icon/icon');
    exports.Icon = icon_2.Icon;
    var img_2 = require('./components/img/img');
    exports.Img = img_2.Img;
    var infinite_scroll_2 = require('./components/infinite-scroll/infinite-scroll');
    exports.InfiniteScroll = infinite_scroll_2.InfiniteScroll;
    var infinite_scroll_content_2 = require('./components/infinite-scroll/infinite-scroll-content');
    exports.InfiniteScrollContent = infinite_scroll_content_2.InfiniteScrollContent;
    var input_2 = require('./components/input/input');
    exports.TextArea = input_2.TextArea;
    exports.TextInput = input_2.TextInput;
    var app_root_2 = require('./components/app/app-root');
    exports.IonicApp = app_root_2.IonicApp;
    var item_2 = require('./components/item/item');
    exports.Item = item_2.Item;
    exports.ItemContent = item_2.ItemContent;
    exports.ItemGroup = item_2.ItemGroup;
    var item_reorder_2 = require('./components/item/item-reorder');
    exports.ItemReorder = item_reorder_2.ItemReorder;
    exports.Reorder = item_reorder_2.Reorder;
    var item_sliding_2 = require('./components/item/item-sliding');
    exports.ItemSliding = item_sliding_2.ItemSliding;
    exports.ItemOptions = item_sliding_2.ItemOptions;
    var label_2 = require('./components/label/label');
    exports.Label = label_2.Label;
    var list_2 = require('./components/list/list');
    exports.List = list_2.List;
    var list_header_2 = require('./components/list/list-header');
    exports.ListHeader = list_header_2.ListHeader;
    var loading_1 = require('./components/loading/loading');
    exports.Loading = loading_1.Loading;
    exports.LoadingController = loading_1.LoadingController;
    var menu_2 = require('./components/menu/menu');
    exports.Menu = menu_2.Menu;
    var menu_close_2 = require('./components/menu/menu-close');
    exports.MenuClose = menu_close_2.MenuClose;
    var menu_controller_1 = require('./components/menu/menu-controller');
    exports.MenuController = menu_controller_1.MenuController;
    var menu_toggle_2 = require('./components/menu/menu-toggle');
    exports.MenuToggle = menu_toggle_2.MenuToggle;
    var menu_types_1 = require('./components/menu/menu-types');
    exports.MenuType = menu_types_1.MenuType;
    var modal_1 = require('./components/modal/modal');
    exports.Modal = modal_1.Modal;
    exports.ModalController = modal_1.ModalController;
    var nav_2 = require('./components/nav/nav');
    exports.Nav = nav_2.Nav;
    var nav_pop_2 = require('./components/nav/nav-pop');
    exports.NavPop = nav_pop_2.NavPop;
    exports.NavPopAnchor = nav_pop_2.NavPopAnchor;
    var nav_push_2 = require('./components/nav/nav-push');
    exports.NavPush = nav_push_2.NavPush;
    exports.NavPushAnchor = nav_push_2.NavPushAnchor;
    var navbar_2 = require('./components/navbar/navbar');
    exports.Navbar = navbar_2.Navbar;
    var native_input_2 = require('./components/input/native-input');
    exports.NativeInput = native_input_2.NativeInput;
    exports.NextInput = native_input_2.NextInput;
    var note_2 = require('./components/note/note');
    exports.Note = note_2.Note;
    var option_2 = require('./components/option/option');
    exports.Option = option_2.Option;
    var overlay_portal_2 = require('./components/nav/overlay-portal');
    exports.OverlayPortal = overlay_portal_2.OverlayPortal;
    var picker_1 = require('./components/picker/picker');
    exports.Picker = picker_1.Picker;
    exports.PickerController = picker_1.PickerController;
    var popover_1 = require('./components/popover/popover');
    exports.Popover = popover_1.Popover;
    exports.PopoverController = popover_1.PopoverController;
    var radio_button_2 = require('./components/radio/radio-button');
    exports.RadioButton = radio_button_2.RadioButton;
    var radio_group_2 = require('./components/radio/radio-group');
    exports.RadioGroup = radio_group_2.RadioGroup;
    var range_2 = require('./components/range/range');
    exports.Range = range_2.Range;
    exports.RangeKnob = range_2.RangeKnob;
    var refresher_2 = require('./components/refresher/refresher');
    exports.Refresher = refresher_2.Refresher;
    var refresher_content_2 = require('./components/refresher/refresher-content');
    exports.RefresherContent = refresher_content_2.RefresherContent;
    var scroll_2 = require('./components/scroll/scroll');
    exports.Scroll = scroll_2.Scroll;
    var searchbar_2 = require('./components/searchbar/searchbar');
    exports.Searchbar = searchbar_2.Searchbar;
    var segment_2 = require('./components/segment/segment');
    exports.Segment = segment_2.Segment;
    exports.SegmentButton = segment_2.SegmentButton;
    var select_2 = require('./components/select/select');
    exports.Select = select_2.Select;
    var show_hide_when_2 = require('./components/show-hide-when/show-hide-when');
    exports.ShowWhen = show_hide_when_2.ShowWhen;
    exports.HideWhen = show_hide_when_2.HideWhen;
    exports.DisplayWhen = show_hide_when_2.DisplayWhen;
    var slides_2 = require('./components/slides/slides');
    exports.Slides = slides_2.Slides;
    exports.Slide = slides_2.Slide;
    exports.SlideLazy = slides_2.SlideLazy;
    var spinner_2 = require('./components/spinner/spinner');
    exports.Spinner = spinner_2.Spinner;
    var tab_2 = require('./components/tabs/tab');
    exports.Tab = tab_2.Tab;
    var tabs_2 = require('./components/tabs/tabs');
    exports.Tabs = tabs_2.Tabs;
    var tab_button_2 = require('./components/tabs/tab-button');
    exports.TabButton = tab_button_2.TabButton;
    var tab_highlight_2 = require('./components/tabs/tab-highlight');
    exports.TabHighlight = tab_highlight_2.TabHighlight;
    var tap_click_1 = require('./components/tap-click/tap-click');
    exports.TapClick = tap_click_1.TapClick;
    exports.isActivatable = tap_click_1.isActivatable;
    var toast_1 = require('./components/toast/toast');
    exports.Toast = toast_1.Toast;
    exports.ToastController = toast_1.ToastController;
    var toggle_2 = require('./components/toggle/toggle');
    exports.Toggle = toggle_2.Toggle;
    var toolbar_2 = require('./components/toolbar/toolbar');
    exports.Toolbar = toolbar_2.Toolbar;
    exports.ToolbarBase = toolbar_2.ToolbarBase;
    exports.Header = toolbar_2.Header;
    exports.Footer = toolbar_2.Footer;
    var toolbar_item_2 = require('./components/toolbar/toolbar-item');
    exports.ToolbarItem = toolbar_item_2.ToolbarItem;
    var toolbar_title_2 = require('./components/toolbar/toolbar-title');
    exports.ToolbarTitle = toolbar_title_2.ToolbarTitle;
    var thumbnail_2 = require('./components/thumbnail/thumbnail');
    exports.Thumbnail = thumbnail_2.Thumbnail;
    var typography_2 = require('./components/typography/typography');
    exports.Typography = typography_2.Typography;
    var virtual_scroll_2 = require('./components/virtual-scroll/virtual-scroll');
    exports.VirtualScroll = virtual_scroll_2.VirtualScroll;
    var action_sheet_component_1 = require('./components/action-sheet/action-sheet-component');
    exports.ActionSheetCmp = action_sheet_component_1.ActionSheetCmp;
    var alert_component_1 = require('./components/alert/alert-component');
    exports.AlertCmp = alert_component_1.AlertCmp;
    var loading_component_1 = require('./components/loading/loading-component');
    exports.LoadingCmp = loading_component_1.LoadingCmp;
    var modal_component_1 = require('./components/modal/modal-component');
    exports.ModalCmp = modal_component_1.ModalCmp;
    var picker_component_2 = require('./components/picker/picker-component');
    exports.PickerCmp = picker_component_2.PickerCmp;
    exports.PickerColumnCmp = picker_component_2.PickerColumnCmp;
    var popover_component_1 = require('./components/popover/popover-component');
    exports.PopoverCmp = popover_component_1.PopoverCmp;
    var toast_component_1 = require('./components/toast/toast-component');
    exports.ToastCmp = toast_component_1.ToastCmp;
    exports.IONIC_DIRECTIVES = [
        avatar_1.Avatar,
        backdrop_1.Backdrop,
        badge_1.Badge,
        button_1.Button,
        card_1.Card,
        card_1.CardContent,
        card_1.CardHeader,
        card_1.CardTitle,
        checkbox_1.Checkbox,
        chip_1.Chip,
        grid_1.Col,
        content_1.Content,
        datetime_1.DateTime,
        fab_1.FabContainer,
        fab_1.FabButton,
        fab_1.FabList,
        toolbar_1.Footer,
        grid_1.Grid,
        toolbar_1.Header,
        show_hide_when_1.HideWhen,
        icon_1.Icon,
        img_1.Img,
        infinite_scroll_1.InfiniteScroll,
        infinite_scroll_content_1.InfiniteScrollContent,
        app_root_1.IonicApp,
        item_1.Item,
        item_1.ItemContent,
        item_1.ItemGroup,
        item_sliding_1.ItemOptions,
        item_reorder_1.ItemReorder,
        item_sliding_1.ItemSliding,
        label_1.Label,
        list_1.List,
        list_header_1.ListHeader,
        menu_1.Menu,
        menu_close_1.MenuClose,
        menu_toggle_1.MenuToggle,
        native_input_1.NativeInput,
        nav_1.Nav,
        navbar_1.Navbar,
        nav_pop_1.NavPop,
        nav_pop_1.NavPopAnchor,
        nav_push_1.NavPush,
        nav_push_1.NavPushAnchor,
        native_input_1.NextInput,
        note_1.Note,
        option_1.Option,
        overlay_portal_1.OverlayPortal,
        picker_component_1.PickerColumnCmp,
        radio_button_1.RadioButton,
        radio_group_1.RadioGroup,
        range_1.Range,
        range_1.RangeKnob,
        refresher_1.Refresher,
        refresher_content_1.RefresherContent,
        item_reorder_1.Reorder,
        grid_1.Row,
        scroll_1.Scroll,
        searchbar_1.Searchbar,
        segment_1.Segment,
        segment_1.SegmentButton,
        select_1.Select,
        show_hide_when_1.ShowWhen,
        slides_1.Slide,
        slides_1.Slides,
        slides_1.SlideLazy,
        spinner_1.Spinner,
        tab_1.Tab,
        tabs_1.Tabs,
        tab_button_1.TabButton,
        tab_highlight_1.TabHighlight,
        input_1.TextArea,
        input_1.TextInput,
        thumbnail_1.Thumbnail,
        toggle_1.Toggle,
        toolbar_1.Toolbar,
        toolbar_item_1.ToolbarItem,
        toolbar_title_1.ToolbarTitle,
        typography_1.Typography,
        virtual_item_1.VirtualFooter,
        virtual_item_1.VirtualHeader,
        virtual_item_1.VirtualItem,
        virtual_scroll_1.VirtualScroll,
    ];
});
//# sourceMappingURL=directives.js.map