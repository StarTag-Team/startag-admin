// import React from 'react'
// import IconMenu from 'material-ui/IconMenu'
// import MenuItem from 'material-ui/MenuItem'
//
// export default class ObjectsListHeader extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//
//     render() {
//         const {title, filtersList} = this.props
//         const {openFilterMenu} = this.state
//         return (
//             <div className='header'>
//                 <div>
//                     <div>
//                         {title}
//                     </div>
//                     <div>
//                         <IconMenu iconButtonElement={this.renderFilterAddIcon()} open={openFilterMenu}
//                                   clickCloseDelay={1}
//                                   onRequestChange={this.toggleFilterAdd}
//                                   targetOrigin={{vertical: 'bottom', horizontal: 'left'}}
//                                   anchorOrigin={{vertical: 'top', horizontal: 'left'}}>
//                             {filtersList.map((filter, key) => (filter.changeable && !filter.enable) ? (
//                                 <MenuItem key={key} value={key} primaryText={filter.title}
//                                           onClick={() => this.onChangeFilterEnable(key)}/>
//                             ) : null)}
//                         </IconMenu>
//                         {this.renderCreateIcon()}
//                         {this.renderReloadIcon()}
//                     </div>
//                 </div>
//                 <div>
//                     {filtersList.map((filter, key) => this.renderFilter(filter, key))}
//                 </div>
//             </div>
//         )
//     }
// }